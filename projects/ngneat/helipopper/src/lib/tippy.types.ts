import { Instance, Props } from 'tippy.js';
import { ElementRef, InjectionToken } from '@angular/core';
import { ViewOptions } from '@ngneat/overview';

export interface CreateOptions extends Partial<TippyProps>, ViewOptions {
  variation: string;
  className: string | string[];
}

export type NgChanges<Component extends object, Props = ExcludeFunctions<Component>> = {
  [Key in keyof Props]: {
    previousValue: Props[Key];
    currentValue: Props[Key];
    firstChange: boolean;
    isFirstChange(): boolean;
  };
};

type MarkFunctionPropertyNames<Component> = {
  [Key in keyof Component]: Component[Key] extends Function ? never : Key;
}[keyof Component];

type ExcludeFunctions<T extends object> = Pick<T, MarkFunctionPropertyNames<T>>;

export const TIPPY_CONFIG = new InjectionToken<Partial<TippyConfig>>('Tippy config', {
  providedIn: 'root',
  factory() {
    return {};
  }
});
export const TIPPY_REF = new InjectionToken('TIPPY_REF');

export type TippyInstance = Instance;
export interface TippyProps extends Props {
  hideOnEscape: boolean;
}

export interface TippyConfig extends TippyProps {
  variations: Record<string, Partial<TippyProps>>;
  defaultVariation: keyof TippyConfig['variations'];
  beforeRender?: (text: string) => string;
}

export function coerceElement(element: TippyElement) {
  return element instanceof ElementRef ? element.nativeElement : element;
}

export type TippyElement = ElementRef | Element;
