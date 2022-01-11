import { mountHook } from '../../testUtils';
import { useLink } from '../link';

describe('useLink', () => {
  let result;
  let contextMock = {
    $Utils: {
      $Router: {
        link: () => '$Router.link() function'
      }
    }
  };

  it('should return shortcut to router link', () => {
    mountHook(() => {
      result = useLink();
    }, contextMock);

    expect(typeof result === 'function').toBe(true);
    expect(result()).toBe('$Router.link() function');
  });
});
