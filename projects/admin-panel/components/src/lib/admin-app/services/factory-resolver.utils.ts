import { ComponentFactoryResolver, ComponentFactory, Type } from '@angular/core';

export function resolve<T>(resolver: ComponentFactoryResolver, component: Type<T>): ComponentFactory<T> {
    return resolver.resolveComponentFactory(component);
  }
