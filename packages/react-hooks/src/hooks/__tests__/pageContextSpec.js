import { mountHook } from '../../testUtils';
import { usePageContext } from '../pageContext';

describe('usePageContext', () => {
  let result;
  let contextMock = {
    customContextValues: 'value',
    anotherOne: false
  };

  it('should return pageContext', () => {
    mountHook(() => {
      result = usePageContext();
    }, contextMock);

    expect(Object.keys(result)).toStrictEqual([
      'customContextValues',
      'anotherOne'
    ]);
  });
});
