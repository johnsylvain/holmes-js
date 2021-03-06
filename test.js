import Holmes from './index';

describe('Holmes', function() {

  beforeEach(() => {
    this.holmes = new Holmes();
  })

  it('should create a new instance', () => {
    expect(this.holmes).toBeInstanceOf(Holmes);
  });

  it('should return the same instance', () => {
    const newInstance = new Holmes();

    expect(this.holmes).toBe(newInstance);
  });

  it('should reset instance', () => {
    let newInstance = new Holmes();

    newInstance = newInstance.reset();

    expect(this.holmes).not.toBe(newInstance);
  })
})