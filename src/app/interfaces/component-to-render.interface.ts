import { Signal } from '@angular/core';

export interface ComponentToRender<C, T> {
  componentType: C;
  inputBindings?: InputBinding<T>[];
  outputBindings?: OutputBinding[];
}

type InputBinding<T> = {
  type: string;
  name: string;
  value: Signal<T>;
};

type OutputBinding = {
  type: string;
  name: string;
  value: (event: unknown) => unknown;
};
