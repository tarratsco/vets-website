import { expect } from 'chai';
import route from './routes';

describe('routes', () => {
  it('should export a single route object (not an array)', () => {
    expect(route).to.be.an('object');
    expect(Array.isArray(route)).to.be.false;
  });

  it('should have path set to /', () => {
    expect(route.path).to.equal('/');
  });

  it('should have an indexRoute that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
    const replaceCalls = [];
    route.indexRoute.onEnter({}, val => replaceCalls.push(val));
    expect(replaceCalls).to.deep.equal(['/introduction']);
  });

  it('should have childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });

  it('should have component set', () => {
    expect(route.component).to.be.a('function');
  });
});