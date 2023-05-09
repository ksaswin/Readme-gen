import { setActivePinia, createPinia } from 'pinia';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { useMdStore } from '@/store/mdstore';


const testSections = [
	{
		selected: true,
		id: 1,
		name: 'Title - A',
		content: 'First section content'
	},
	{
		selected: false,
		id: 3,
		name: 'Title - C',
		content: 'Third section content'
	},
	{
		selected: false,
		id: 2,
		name: 'Title - B',
		content: 'Second section content'
	},
	{
		selected: false,
		id: 4,
		name: 'Title - D',
		content: 'Fourth section content'
	}
];

const testSection = {
	selected: false,
	id: 32,
	name: 'New Section',
	content: 'hello'
};

describe('Md Store', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	it('creates', () => {
		const store = useMdStore();

		expect(store.isLightModeEnabled).toBeFalsy();
		expect(store.usedSections.length).toBe(1);
		expect(store.availableSections.length).toBe(31);
		expect(store.newSectionId).toBe(32);
	});

	describe('mdStore actions', () => {
		it('toggleLightMode action updates the isLightModeEnabled state', () => {
			const store = useMdStore();

			expect(store.isLightModeEnabled).toBeFalsy();
			store.toggleLightMode();
			expect(store.isLightModeEnabled).toBeTruthy();
		});

		it('incrementId action updates the newSectionId state', () => {
			const store = useMdStore();

			expect(store.newSectionId).toBe(32);
			store.incrementId();
			expect(store.newSectionId).toBe(33);
		});

		it('updateUsedSectionContent action re-writes the content within the selected section', () => {
			const store = useMdStore();

			const selectedSectionContent = '\n# Project Title\n\nA brief description of what this project does and who it\'s for\n\n';
			const newContent = '\n# New Test Title\n\nSome test content here\n\n';

			expect(store.usedSections.length).toBe(1);
			expect(store.usedSections[0].content).toBe(selectedSectionContent);

			store.updateUsedSectionContent(newContent);
			expect(store.usedSections[0].content).toBe(newContent);
		});

		it('addSectionToUsedSections action removes the section from availableSections and add it to usedSections', () => {
			const store = useMdStore();

			const testAddToUsed = { ...testSection };

			expect(store.usedSections.length).toBe(1);

			store.addSectionToUsedSections(testAddToUsed);
			expect(store.usedSections.length).toBe(2);
			expect(store.usedSections[1].selected).toBeTruthy();
			expect(store.usedSections[1].id).toBe(32);
			expect(store.usedSections[1].name).toBe('New Section');
			expect(store.usedSections[1].content).toBe('hello');
		});

		it('updateSelectedFlagInSection action returns undefined when bad index is passed', () => {
			const store = useMdStore();

			const testIndices = [-1, 1];

			expect(store.usedSections.length).toBe(1);
			expect(store.usedSections[0].selected).toBeTruthy();

			expect(store.updateSelectedFlagInSection(testIndices[0], false)).toBeUndefined();
			expect(store.usedSections[0].selected).toBeTruthy();

			expect(store.updateSelectedFlagInSection(testIndices[1], false)).toBeUndefined();
			expect(store.usedSections[0].selected).toBeTruthy();
		});

		it('updateSelectedFlagInSection action updates the selected flag of the section', () => {
			const store = useMdStore();

			expect(store.usedSections.length).toBe(1);
			expect(store.usedSections[0].selected).toBeTruthy();

			store.updateSelectedFlagInSection(0, false);
			expect(store.usedSections[0].selected).toBeFalsy();
		});

		it('updateAllSelectedFlagsInUsedSections action updates all flags', () => {
			const store = useMdStore();

			const sectionId = 30;

			expect(store.usedSections[0].id).toBe(sectionId);
			expect(store.usedSections[0].selected).toBeFalsy();

			store.updateAllSelectedFlagsInUsedSections(sectionId);
			expect(store.usedSections[0].selected).toBeTruthy();
		});

		it('spliceUsedSection action removes elements from usedSection state', () => {
			const store = useMdStore();

			store.usedSections = [ ...testSections ];

			expect(store.usedSections.length).toBe(testSections.length);

			store.spliceUsedSection(1, 1);
			expect(store.usedSections.length).toBe(testSections.length - 1);

			store.spliceUsedSection(1, 0, testSections[1]);
			expect(store.usedSections.length).toBe(testSections.length);
			expect(store.usedSections).toEqual(testSections);
		});

		it('slicedUsedSectionContent action returns sliced content', () => {
			const store = useMdStore();

			expect(store.slicedUsedSectionContent(19)).toBe('Some test content here\n\n');
			expect(store.slicedUsedSectionContent(1, 17)).toBe('# New Test Title');
		});

		it('sortAvailableSections action sorts sections within the availableSections state', () => {
			const store = useMdStore();

			store.availableSections = [ ...testSections ];

			expect(store.availableSections.length).toBe(testSections.length);

			store.sortAvailableSections();
			store.availableSections.forEach((section, index) => {
				expect(section.id).toBe(index+1);
			});
		});

		it('unshiftToAvailableSections action appends a section to the beginning of availableSections', () => {
			const store = useMdStore();

			store.availableSections = [ ...testSections ];

			expect(store.availableSections.length).toBe(testSections.length);

			store.unshiftToAvailableSections({ ...testSection });
			expect(store.availableSections.length).toBe(testSections.length + 1);
			expect(store.availableSections[0].selected).toBeFalsy();
			expect(store.availableSections[0].id).toBe(32);
			expect(store.availableSections[0].name).toBe('New Section');
			expect(store.availableSections[0].content).toBe('hello');
		});

		it('pushToAvailableSections action appends a section to the end of availableSections', () => {
			const store = useMdStore();

			store.availableSections = [ ...testSections ];

			expect(store.availableSections.length).toBe(testSections.length);

			store.pushToAvailableSections({ ...testSection });
			expect(store.availableSections.length).toBe(testSections.length + 1);
			expect(store.availableSections[testSections.length].selected).toBeFalsy();
			expect(store.availableSections[testSections.length].id).toBe(32);
			expect(store.availableSections[testSections.length].name).toBe('New Section');
			expect(store.availableSections[testSections.length].content).toBe('hello');
		});

		it('removeSectionFromAvailableSections action removes section from availableSections', () => {
			const store = useMdStore();

			store.availableSections = [ ...testSections ];

			expect(store.availableSections.length).toBe(testSections.length);

			store.removeSectionFromAvailableSections(testSections[0]);
			expect(store.availableSections.length).toBe(testSections.length - 1);
		});

    it('download action downloads all content', () => {
			const store = useMdStore();

      global.URL.createObjectURL = vi.fn();
      const blobSpy = vi.spyOn(global, 'Blob').mockImplementationOnce(() => ({
        size: 80
      }));

      store.download();
      expect(blobSpy).toHaveBeenCalled();
      expect(global.URL.createObjectURL).toHaveBeenCalledWith({ size: 80 });
    });
	});

	describe('mdStore getters', () => {
		it('usedSectionsLength getter returns the length of the usedSections state', () => {
			const store = useMdStore();

			expect(store.usedSectionsLength).toBe(store.usedSections.length);
		});

		it('selectedIndex getter returns the index of the element with selected flag set to true', () => {
			const store = useMdStore();

			expect(store.selectedIndex).toBe(0);
		});

		it('allContent getter returns the accumulated string from content within all usedSection elements', () => {
			const store = useMdStore();

			store.usedSections = [ ...testSections ];

			expect(store.allContent).toBe('First section contentThird section contentSecond section contentFourth section content');
		});
	});
});
