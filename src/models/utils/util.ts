import { throttle } from "lodash"
import { useCallback } from "react"

export const useCallbackThrottle = <T extends (...args: any[]) => any>(func: T) => {
  return throttle(useCallback(func, []), 200);
}