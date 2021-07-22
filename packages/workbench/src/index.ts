//
// Copyright © 2020, 2021 Anticrm Platform Contributors.
// 
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// 
// See the License for the specific language governing permissions and
// limitations under the License.
//

import type { IntlString, Asset } from '@anticrm/platform'
import type { Ref, Class, Doc, Obj, Space, Mixin } from '@anticrm/core'
import type { Plugin } from '@anticrm/platform'
import type { AnyComponent, AnySvelteComponent } from '@anticrm/ui'
import { writable } from 'svelte/store'

import { plugin } from '@anticrm/platform'

export interface Application extends Doc {
  label: IntlString
  icon: Asset
  navigatorModel?: NavigatorModel
}

export interface SpacesNavModel {
  label: IntlString
  spaceClass: Ref<Class<Space>>
  addSpaceLabel: IntlString
  createComponent: AnyComponent
  component?: AnyComponent
}

export interface NavigatorModel {
  spaces: SpacesNavModel[]
}

export interface SpaceView extends Class<Obj> {
  view: AnyComponent
  createItemDialog?: AnyComponent
}

export const workbenchId = 'workbench' as Plugin

export default plugin(workbenchId, {
  class: {
    Application: '' as Ref<Class<Application>>
  },
  mixin: {
    SpaceView: '' as Ref<Mixin<SpaceView>>
  }
})

interface CompAndProps {
  is: AnySvelteComponent | AnyComponent | undefined
  props: any
  element: HTMLElement | undefined
}

export const store = writable<CompAndProps>({
  is: undefined,
  props: {},
  element: undefined
})

export function showModal (component: AnySvelteComponent | AnyComponent, props: any, element?: HTMLElement): void {
  store.set({ is: component, props, element: element })
}

export function closeModal (): void {
  store.set({ is: undefined, props: {}, element: undefined })
}

