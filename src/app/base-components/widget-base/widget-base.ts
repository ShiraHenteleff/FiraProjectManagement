import { Component, input } from '@angular/core';
import { WidgetStatus } from '../../interfaces/widget-status.interface';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'widget-base',
  imports: [NgClass, MatTooltip],
  templateUrl: './widget-base.html',
  styleUrl: './widget-base.css',
})
export class WidgetBase {
  widgetStatus = input<WidgetStatus<any>>({
    status: 'neutral',
    tooltipText: 'Tooltip info goes here',
    value: undefined,
    icon: 'caution-sign.svg',
  });
}
