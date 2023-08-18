export const tryCatchWrapper = (fn: () => {}, onFinally: () => {}) => {
  try {
    fn();
  } catch (error) {
  } finally {
    onFinally();
  }
};
