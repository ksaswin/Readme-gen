import { describe, beforeEach, expect, it } from 'vitest';
import { VueWrapper } from '@vue/test-utils';

import AddSection from '@/components/AddSection.vue';
import { HarnessMount } from '../test-harness';


describe('AddSection.vue', () => {
	let wrapper: VueWrapper<any>;

	beforeEach( async () => {
		wrapper = HarnessMount(AddSection);
		await wrapper.vm.$nextTick();
	});

	it('renders', async () => {
		const modalDiv = wrapper.find('div.custom-window');
		expect(modalDiv.exists()).toBe(true);

		const modalHeader = wrapper.find('h3.custom-header');
		expect(modalHeader.text()).toBe('New Custom Section');

		const inputField = wrapper.find('input');
		expect(inputField.attributes().placeholder).toBe('Section Title');
		expect(inputField.element.value).toBe('');

		const actionButtons = wrapper.findAll('button');
		expect(actionButtons.length).toBe(2);
		expect(actionButtons[0].text()).toBe('Cancel');
		expect(actionButtons[1].text()).toBe('Add Section');
	});

	it('triggers close-modal event when Cancel button is clicked', async () => {
		const cancelButton = wrapper.find('button.cancel');
		expect(cancelButton.text()).toBe('Cancel');

		await cancelButton.trigger('click');
		expect(wrapper.emitted()['close-trigger']).toBeTruthy();
	});

	it('renders Add Section button as disabled when input field is empty', async () => {
		const addButton = wrapper.find('button.add');
		expect(addButton.text()).toBe('Add Section');

		const inputField = wrapper.find('input');
		expect(inputField.element.value).toBe('');

		expect(addButton.element.disabled).toBe(true);
	});

	it('enables Add Section button when text is provided within input field', async () => {
		const inputContent = 'New Title';

		const inputField = wrapper.find('input');
		expect(inputField.element.value).toBe('');

		const addButton = wrapper.find('button.add');
		expect(addButton.element.disabled).toBe(true);

		await inputField.setValue(inputContent);
		expect(inputField.element.value).toBe(inputContent);
		expect(addButton.element.disabled).toBe(false);
	});

	it('triggers add-new event and passes section title to parent', async () => {
		const inputContent = 'New Title';

		const inputField = wrapper.find('input');
		expect(inputField.element.value).toBe('');

		const addButton = wrapper.find('button.add');
		expect(addButton.element.disabled).toBe(true);

		await inputField.setValue(inputContent);
		expect(inputField.element.value).toBe(inputContent);
		expect(addButton.element.disabled).toBe(false);

		await addButton.trigger('click');
		expect(wrapper.emitted()['add-new']).toBeTruthy();
		expect(wrapper.emitted()['add-new']).toEqual([[ 'New Title' ]]);
	});
});
