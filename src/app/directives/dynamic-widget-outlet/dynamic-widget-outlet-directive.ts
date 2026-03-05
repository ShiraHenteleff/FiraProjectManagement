import {
  Binding,
  Directive,
  inject,
  input,
  inputBinding,
  OnInit,
  outputBinding,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { ComponentToRender } from '../../interfaces/component-to-render.interface';
import { ProgressWidgetData } from '../../interfaces/progress-widget-data.interface';

@Directive({
  selector: '[DynamicWidgetOutletDirective]',
})
export class DynamicWidgetOutletDirective implements OnInit {
  constructor() {}
  private viewContainerRef = inject(ViewContainerRef);
  componentsToRender = input.required<ComponentToRender<any, string | number | ProgressWidgetData>[]>();

  ngOnInit() {
    this.componentsToRender().forEach((component) => {
      let bindings: Binding[] = [];

      if (component.inputBindings) {
        bindings = bindings.concat(
          component.inputBindings.map((binding) => {
            return inputBinding(binding.name, binding.value);
          }),
        );
      }

      if (component.outputBindings) {
        bindings = bindings.concat(
          component.outputBindings.map((binding) => {
            return outputBinding(binding.name, binding.value);
          }),
        );
      }

      this.viewContainerRef.createComponent(component.componentType, {
        bindings: bindings,
      });
    });
  }
}
