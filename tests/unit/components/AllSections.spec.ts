import { describe, beforeEach, expect, it, vi } from 'vitest';
import { VueWrapper } from '@vue/test-utils';

import AllSections from '@/components/AllSections.vue';
import { useMdStore } from '@/store/mdstore';
import { HarnessMount, UsePinia } from '../test-harness';


describe('AllSections.vue', () => {
	let wrapper: VueWrapper<any>;
	let store;

	beforeEach(async () => {
		wrapper = HarnessMount(AllSections, UsePinia());
		await wrapper.vm.$nextTick();

		store = useMdStore();
	});

	it('renders', () => {
		const allSectionsComponent = wrapper.find('div.sections-wrapper');
		expect(allSectionsComponent.exists()).toBe(true);

		const header = allSectionsComponent.find('h4.sections-head');
		expect(header.text()).toBe('Sections');
	});

	it('renders Templates section with all quick template buttons', () => {
		const templatesSection = wrapper.find('div.templates-section');
		expect(templatesSection.exists()).toBe(true);

		const templatesSectionDesc = templatesSection.find('p.section-header');
		expect(templatesSectionDesc.text()).toBe('Click on an icon below to add a quick template');

		const quickTemplatesRow = templatesSection.find('div.quick-templates');
		expect(quickTemplatesRow.exists()).toBe(true);

		const quickTemplateButtons = quickTemplatesRow.findAll('button');
		expect(quickTemplateButtons.length).toBe(4);

		const quickTemplateButtonIcons = quickTemplatesRow.findAll('button img');
		expect(quickTemplateButtonIcons.length).toBe(4);
		expect(quickTemplateButtonIcons[0].attributes().alt).toBe('Code icon');
		expect(quickTemplateButtonIcons[1].attributes().alt).toBe('Link icon');
		expect(quickTemplateButtonIcons[2].attributes().alt).toBe('Image icon');
		expect(quickTemplateButtonIcons[3].attributes().alt).toBe('Table icon');
	});

	it('renders used and available sections with section title names', () => {
		const scrollableSections = wrapper.find('div.scrollable-sections');
		expect(scrollableSections.exists()).toBe(true);

		const selectedSection = scrollableSections.find('div.selected-sections');
		expect(selectedSection.exists()).toBe(true);
		expect(selectedSection.find('p.section-header').text()).toBe('Click on a section below to edit the contents');

		const selectedSectionItems = selectedSection.findAll('li');
		expect(selectedSectionItems.length).toBe(store.usedSections.length);

		const selectedSectionItemTitles = selectedSection.findAll('li p.section-title');
		expect(selectedSectionItemTitles.length).toBe(1);
		expect(selectedSectionItemTitles[0].text()).toBe(store.usedSections[0].name);

		const availableSection = scrollableSections.find('div.available-sections');
		expect(availableSection.exists()).toBe(true);
		expect(availableSection.find('p.section-header').text()).toBe('Click on a section below to add it to your readme');

		const addCustomSectionButton = availableSection.find('button.custom-section');
		expect(addCustomSectionButton.text()).toBe('+ Custom Section');

		const availableSectionItems = availableSection.findAll('li');
		expect(availableSectionItems.length).toBe(store.availableSections.length);

		const availableSectionItemTitles = availableSection.findAll('li p.available-title');
		expect(availableSectionItemTitles.length).toBe(store.availableSections.length);
		store.availableSections.forEach((section, index) => {
			expect(availableSectionItemTitles[index].text()).toBe(section.name);
		});
	});

	it('opens add new section modal when clicking on + Custom Section button', async () => {
		expect(wrapper.find('add-section-stub').exists()).toBe(false);

		const addCustomSectionButton = wrapper.find('button.custom-section');
		expect(addCustomSectionButton.exists()).toBe(true);

		await addCustomSectionButton.trigger('click');
		expect(wrapper.find('add-section-stub').exists()).toBe(true);
	});

	it('removes section from available section when clicking on one and adds it to selected sections', async () => {
		store.addSectionToUsedSections = vi.fn();
		store.updateAllSelectedFlagsInUsedSections = vi.fn();

		const availableSection = wrapper.find('ul.available');
		expect(availableSection.exists()).toBe(true);

		const initialAvailableItemsLength = store.availableSections.length;

		const availableSectionItems = availableSection.findAll('li button.section-btn');
		expect(availableSectionItems.length).toBe(initialAvailableItemsLength);

		expect(availableSectionItems[0].text()).toBe('Acknowledgements');
		await availableSectionItems[0].trigger('click');

		expect(store.addSectionToUsedSections).toHaveBeenCalled();
		expect(store.addSectionToUsedSections).toHaveBeenCalledWith(store.availableSections[0]);
		expect(store.updateAllSelectedFlagsInUsedSections).toHaveBeenCalled();
		expect(store.updateAllSelectedFlagsInUsedSections).toHaveBeenCalledWith(store.availableSections[0].id);

		expect(wrapper.emitted()).toBeTruthy();
		expect(wrapper.emitted()['selected-index']).toEqual([[ 0 ]]);
	});

  it('filters available section with the search filter from input field', async () => {
	const availableSection = wrapper.find('ul.available');
	expect(availableSection.exists()).toBe(true);

	let availableSectionItems = availableSection.findAll('li button.section-btn');
	expect(availableSectionItems.length).toBe(store.availableSections.length);

    const searchFilter = wrapper.find('input.search-filter');
	searchFilter.setValue('ack');
	await wrapper.vm.$nextTick();

	availableSectionItems = availableSection.findAll('li button.section-btn');
	expect(availableSectionItems.length).toBe(2);

	const filteredSections = [ 'Acknowledgements', 'Feedback' ];
	availableSectionItems.forEach((sectionItem, index) => {
		expect(sectionItem.text()).toBe(filteredSections[index]);
	});
  });

	it('renders all items within a selected section item button', () => {
		const selectedSectionItem = wrapper.find('div.selected-sections ul.section-name li button');
		expect(selectedSectionItem.exists()).toBe(true);

		const orderUpdateButtons = selectedSectionItem.findAll('div.change-order img');
		expect(orderUpdateButtons.length).toBe(2);
		expect(orderUpdateButtons[0].attributes().alt).toBe('arrow up icon');
		expect(orderUpdateButtons[1].attributes().alt).toBe('arrow down icon');

		const sectionTitle = selectedSectionItem.find('p.section-title');
		expect(sectionTitle.text()).toBe(store.usedSections[0].name);

		const deleteSectionButton = selectedSectionItem.find('div.section-right img');
		expect(deleteSectionButton.attributes().alt).toBe('delete icon');
	});

	it('delete icon removes the section from selected sections', async () => {
		store.updateSelectedFlagInSection = vi.fn();
		store.unshiftToAvailableSections = vi.fn();
		store.spliceUsedSection = vi.fn();

		const selectedSectionItem = wrapper.find('div.selected-sections ul.section-name li button');

		const deleteSectionButton = selectedSectionItem.find('div.section-right img');
		expect(deleteSectionButton.attributes().alt).toBe('delete icon');

		await deleteSectionButton.trigger('click');

		expect(store.updateSelectedFlagInSection).toHaveBeenCalled();
		expect(store.updateSelectedFlagInSection).toHaveBeenCalledWith(0, false);

		expect(store.unshiftToAvailableSections).toHaveBeenCalled();
		expect(store.unshiftToAvailableSections).toHaveBeenCalledWith(store.usedSections[0]);

		expect(store.spliceUsedSection).toHaveBeenCalled();
		expect(store.spliceUsedSection).toHaveBeenCalledWith(0, 1);

		expect(wrapper.emitted()).toBeTruthy();
		expect(wrapper.emitted()['selected-index']).toEqual([[-1]]);
	});

	it('change order buttons updates the section order in selected sections', async () => {
		store.spliceUsedSection = vi.fn();

		const testSection = {
			id: 34,
			selected: false,
			name: 'Section title',
			content: 'Test content'
		};
		store.usedSections.push({ ...testSection });

		expect(store.usedSections.length).toBe(2);

		const selectedSectionItem = wrapper.find('div.selected-sections ul.section-name li');

		const changeOrderButtons = selectedSectionItem.findAll('div.change-order img');
		expect(changeOrderButtons.length).toBe(2);

		await changeOrderButtons[0].trigger('click'); // Trying to move up, but should'nt allow
		expect(store.spliceUsedSection).toHaveBeenCalledTimes(0);

		await changeOrderButtons[1].trigger('click'); // Trying to move down and this should be allowed
		expect(store.spliceUsedSection).toHaveBeenCalled();
		expect(store.spliceUsedSection).toHaveBeenCalledWith(1, 0, store.usedSections[0]);

		expect(wrapper.emitted()).toBeTruthy();
		expect(wrapper.emitted()['selected-index']).toEqual([[ 1 ]]);
	});
});
