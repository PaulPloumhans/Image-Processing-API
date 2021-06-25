import testJasmine from '../index';

describe('api endpoint testing', () => {
    it('expect testJasmine(5,7) to equal 12', () => {
        expect(testJasmine(5, 7)).toEqual(12);
    });
});
