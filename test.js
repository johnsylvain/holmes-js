import Holmes from './index';

describe('Holmes', function() {

  beforeEach(() => {
    this.holmes = new Holmes();
  })

  it('should create a new instance', () => {
    expect(this.holmes).toBeInstanceOf(Holmes);
  });
})