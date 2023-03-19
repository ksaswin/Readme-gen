import { mount, shallowMount, VueWrapper, type MountingOptions } from '@vue/test-utils';
import type { Pinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useRouter } from 'vue-router';
import { vi } from 'vitest';


export const HarnessFullMount = (component: Object, pinia?: Pinia, config?: MountingOptions<any, any>): VueWrapper<any> => {
  let plugins = [useRouter()] as Plugin[];

  if (config?.global?.plugins) {
    plugins = plugins.concat(config?.global?.plugins as Plugin[]);
  }

  if (pinia) {
    plugins.push(pinia);
  }

  return mount(component, {
    ...config,
    global: {
      ...config?.global,
      plugins
    }
  });
};

export const HarnessMount = (component: Object, pinia?: Pinia, config?: MountingOptions<any, any>): VueWrapper<any> => {
  let plugins = [useRouter()] as Plugin[];

  if (config?.global?.plugins) {
    plugins = plugins.concat(config?.global?.plugins as Plugin[]);
  }

  if (pinia) {
    plugins.push(pinia);
  }

  return shallowMount(component, {
    ...config,
    global: {
      ...config?.global,
      plugins
    }
  });
};

export const HarnessMountMockRouter = (component: Object, pinia?: Pinia, config?: MountingOptions<any, any>): VueWrapper<any> => {
  let plugins = [] as Plugin[];

  if (config?.global?.plugins) {
    plugins = plugins.concat(config?.global?.plugins as Plugin[]);
  }

  if (pinia) {
    plugins.push(pinia);
  }

  const stubs = (config?.global?.stubs as string[]) || [];

  stubs.push('router-link');
  stubs.push('router-view');

  return shallowMount(component, {
    ...config,
    global: {
      ...config?.global,
      plugins,
      stubs
    }
  });
};

export function UsePinia(options: object): Pinia {
  return createTestingPinia({
    ...options,
    createSpy: vi.fn
  });
}

