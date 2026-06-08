import { useCallback, useEffect, useLayoutEffect, useState } from "react";

type FormResetOptions = {
  /** Reset when the form page mounts, not only when it unmounts. */
  resetOnEnter?: boolean;
  /** Extra cleanup (e.g. clear local validation state). */
  onReset?: () => void;
};

/**
 * Clears Zustand form state when the form page unmounts.
 * Optionally also resets on mount and returns a key to remount controlled inputs.
 */
export const useFormResetOnLeave = (
  reset: () => void,
  options?: FormResetOptions,
): number => {
  const [formKey, setFormKey] = useState(0);
  const onReset = options?.onReset;

  const runReset = useCallback(
    (bumpKey = false) => {
      reset();
      onReset?.();
      if (bumpKey) {
        setFormKey((key) => key + 1);
      }
    },
    [reset, onReset],
  );

  useLayoutEffect(() => {
    if (options?.resetOnEnter) {
      runReset(true);
    }
  }, [options?.resetOnEnter, runReset]);

  useEffect(() => {
    return () => {
      runReset(false);
    };
  }, [runReset]);

  return formKey;
};
