import { Dispatcher } from '@ima/core';
import { AbstractComponent } from '@ima/react-page-renderer';
import { toMockedInstance } from 'to-mock';

import AbstractManagedComponent from '../AbstractManagedComponent';

const eventTarget = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

const listener = {
  bind: jest.fn(),
};

listener.bind.mockReturnValue(listener);

const $Utils = {
  $Dispatcher: toMockedInstance(Dispatcher, {
    listen: jest.fn(),
    unlisten: jest.fn(),
  }),
};

const testCallbackFunction = jest.fn();
const timeoutTestCallbackFunction = jest.fn();
const intervalTestCallbackFunction = jest.fn();

class TestComponent extends AbstractManagedComponent {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    testCallbackFunction();
  }
}

AbstractManagedComponent.prototype.componentWillUnmount = jest.fn();

AbstractComponent.prototype.listen = jest.fn();
AbstractComponent.prototype.unlisten = jest.fn();

describe('AbstractManagedComponent', () => {
  const Component = new TestComponent({ $Utils });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('Component construction', () => {
    it('should throw error when creating instance without utils', () => {
      expect(() => new TestComponent({})).toThrow();
    });
  });

  describe('Component timer functions', () => {
    it('should call callback within setTimeout', () => {
      Component.setTimeout(timeoutTestCallbackFunction, 1000);

      expect(timeoutTestCallbackFunction).not.toHaveBeenCalled();

      jest.advanceTimersByTime(2000);
      expect(timeoutTestCallbackFunction).toHaveBeenCalled();
    });

    it('should not call callback within setTimeout when calling clearTimeout', () => {
      Component.setTimeout(timeoutTestCallbackFunction, 1000);

      expect(timeoutTestCallbackFunction).not.toHaveBeenCalled();
      Component.clearTimeout(timeoutTestCallbackFunction);

      jest.advanceTimersByTime(2000);
      expect(timeoutTestCallbackFunction).not.toHaveBeenCalled();
    });

    it('should call callback within setInterval and stop after calling clearInterval', () => {
      Component.setInterval(intervalTestCallbackFunction, 1000);

      expect(intervalTestCallbackFunction).not.toHaveBeenCalled();

      jest.advanceTimersByTime(2000);
      expect(intervalTestCallbackFunction).toHaveBeenCalledTimes(2);

      Component.clearInterval(intervalTestCallbackFunction);
      jest.advanceTimersByTime(2000);

      expect(intervalTestCallbackFunction).toHaveBeenCalledTimes(2);
    });

    it('should not call callback within setInterval when calling clearInterval', () => {
      Component.setInterval(intervalTestCallbackFunction, 1000);

      expect(intervalTestCallbackFunction).not.toHaveBeenCalled();
      Component.clearInterval(intervalTestCallbackFunction);

      jest.advanceTimersByTime(2000);
      expect(intervalTestCallbackFunction).not.toHaveBeenCalled();
    });
  });

  describe('React methods override', () => {
    it('should call original and override of componentWillUnmount', () => {
      Component.componentWillUnmount();

      expect(testCallbackFunction).toHaveBeenCalled();
      expect(
        AbstractManagedComponent.prototype.componentWillUnmount
      ).toHaveBeenCalled();
    });
  });

  describe('ima listener', () => {
    it('should add event listener to event target', () => {
      Component.listen(eventTarget, 'event', listener);

      expect(listener.bind).toHaveBeenCalled();
      expect(AbstractComponent.prototype.listen).toHaveBeenCalled();
    });

    it('should remove added event listener from event target', () => {
      Component.unlisten(eventTarget, 'event', listener);

      expect(AbstractComponent.prototype.unlisten).toHaveBeenCalled();
    });
  });

  describe('Dom listener', () => {
    it('should add event listener to event target', () => {
      Component.addDomListener(eventTarget, 'event', listener);

      expect(listener.bind).toHaveBeenCalled();
      expect(eventTarget.addEventListener).toHaveBeenCalled();
    });

    it('should remove added event listener from event target', () => {
      Component.removeDomListener(eventTarget, 'event', listener);

      expect(eventTarget.removeEventListener).toHaveBeenCalled();
    });
  });

  describe('Dispatcher listener', () => {
    it('should add event listener to event target', () => {
      Component.addDispatcherListener('event', listener);

      expect($Utils.$Dispatcher.listen).toHaveBeenCalled();
    });

    it('should remove added event listener from event target', () => {
      Component.removeDispatcherListener('event', listener);

      expect($Utils.$Dispatcher.unlisten).toHaveBeenCalled();
    });
  });
});
