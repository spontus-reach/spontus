"use client";

import {
  cloneElement,
  isValidElement,
  useId,
  type ReactElement,
  type ReactNode,
} from "react";
import { Label } from "@/components/ui/label";

type FieldProps = {
  label: string;
  children: ReactNode;
};

type FieldControlProps = {
  id?: string;
};

export function Field({ label, children }: FieldProps) {
  const generatedId = useId();
  const id = `field-${generatedId.replaceAll(":", "")}`;
  const controlId = isValidElement<FieldControlProps>(children)
    ? children.props.id ?? id
    : id;
  const control = isValidElement<FieldControlProps>(children)
    ? cloneElement(children as ReactElement<FieldControlProps>, {
        id: controlId,
      })
    : children;

  return (
    <div>
      <Label htmlFor={controlId} className="mb-1.5 block text-sm">
        {label}
      </Label>
      {control}
    </div>
  );
}
