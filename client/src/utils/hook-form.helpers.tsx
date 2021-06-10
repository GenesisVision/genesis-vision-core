import React from "react";
import { FormContext } from "react-hook-form";
import { FormContextValues } from "react-hook-form/dist/contextTypes";

export const HookForm: React.FC<{
  resetOnSuccess?: boolean;
  form: FormContextValues<any>;
  onSubmit?: (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => void | Promise<void>;
  className?: string;
}> = ({ resetOnSuccess, form, onSubmit, children, className }) => {
  const handleSubmit = form.handleSubmit((values: any) => {
    if (!onSubmit) return;
    return (onSubmit(values) as Promise<void>).then((value) => {
      if (resetOnSuccess) postponeFunc(() => form.reset(form.watch()));
      return value;
    });
  });

  return (
    <FormContext {...form}>
      <form
        style={{ width: "100%" }}
        className={className}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext>
  );
};

export type MiddlewareType<T = any> = (res: T) => void;

export const postponeCallback = (callback?: Function): MiddlewareType => {
  return () => {
    postponeFunc(callback);
  };
};

export const postponeFunc = (func?: Function) =>
  setTimeout(() => {
    func && func();
  }, 1000);
