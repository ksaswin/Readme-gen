import { describe, beforeEach, expect, it } from 'vitest';
import { VueWrapper } from '@vue/test-utils';

import MarkDown from '@/components/MarkDown.vue';
import { useMdStore } from '@/store/mdstore';
import { HarnessMount, UsePinia } from '../test-harness';


describe('MarkDown.vue', () => {
	let wrapper: VueWrapper<any>;
	let store;

	beforeEach(async () => {
		wrapper = HarnessMount(MarkDown, UsePinia());
		await wrapper.vm.$nextTick();

		store = useMdStore();
	});

	it('renders', () => {
		const allSectionsComponent = wrapper.find('div.markdown-containers');
		expect(allSectionsComponent.exists()).toBe(true);
	});

	it('renders Editor text-area when working on a section', () => {
		const containers = wrapper.findAll('div.container');
		expect(containers.length).toBe(2);

		const editorTitle = containers[0].find('h4.editor');
		expect(editorTitle.text()).toBe('Editor');

		const textArea = containers[0].find('textarea');
		expect(textArea.element.value).toBe(store.usedSections[0].content);
	});

	it('renders fallback Editor message when not working on a section', async () => {
		const containers = wrapper.findAll('div.container');
		expect(containers.length).toBe(2);

		const editorTitle = containers[0].find('h4.editor');
		expect(editorTitle.text()).toBe('Editor');

		await wrapper.vm.changeCurrentContent(-1);

		const textArea = containers[0].find('textarea');
		expect(textArea.exists()).toBe(false);

		const fallbackMessage = containers[0].find('h5.editor');
		expect(fallbackMessage.text()).toBe('Select a section from the sidebar to edit the contents.');
	});

	it('renders preview area with rendered markdown content', () => {
		const containers = wrapper.findAll('div.container');
		expect(containers.length).toBe(2);

		const areaHeaders = containers[1].findAll('div.changer-selections h4');
		expect(areaHeaders.length).toBe(2);
		expect(areaHeaders[0].text()).toBe('Preview');
		expect(areaHeaders[0].attributes().class).toBe('selected');
		expect(areaHeaders[1].text()).toBe('Raw');
		expect(areaHeaders[1].attributes().class).toBe('');

		const copyToClipboardButton = containers[1].find('button');
		expect(copyToClipboardButton.exists()).toBe(true);

		const previewArea = containers[1].find('div.view-area');
		expect(previewArea.exists()).toBe(true);
		expect(previewArea.text()).toBe('Project Title\nA brief description of what this project does and who it\'s for');

		const rawContentView = containers[1].find('textarea.view-area');
		expect(rawContentView.exists()).toBe(false);
	});

	it('renders raw area when clicking on Raw header', async () => {
		const containers = wrapper.findAll('div.container');
		expect(containers.length).toBe(2);

		const areaHeaders = containers[1].findAll('div.changer-selections h4');
		expect(areaHeaders.length).toBe(2);
		expect(areaHeaders[0].text()).toBe('Preview');
		expect(areaHeaders[0].attributes().class).toBe('selected');
		expect(areaHeaders[1].text()).toBe('Raw');
		expect(areaHeaders[1].attributes().class).toBe('');

		await areaHeaders[1].trigger('click');
		expect(areaHeaders[0].attributes().class).toBe('');
		expect(areaHeaders[1].attributes().class).toBe('selected');

		const copyToClipboardButton = containers[1].find('button');
		expect(copyToClipboardButton.exists()).toBe(true);

		const previewArea = containers[1].find('div.view-area');
		expect(previewArea.exists()).toBe(false);

		const rawContentView = containers[1].find('textarea.view-area');
		expect(rawContentView.exists()).toBe(true);
		expect(rawContentView.text()).toBe('# Project Title\n\nA brief description of what this project does and who it\'s for');
	});
});
