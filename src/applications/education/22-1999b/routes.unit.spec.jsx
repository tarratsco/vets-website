import { expect } from 'chai';

import route from '../routes';

describe('routes', () => {
  it('exports a route object with path "/"', () => {
    expect(route).to.be.an('object');
    expect(route.path).to.equal('/');
  });

  it('has a component property', () => {
    expect(route.component).to.be.a('function');
  });

  it('has an indexRoute with onEnter', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });

  it('indexRoute onEnter calls replace with /introduction', () => {
    let replaced = '';
    route.indexRoute.onEnter({}, val => {
      replaced = val;
    });
    expect(replaced).to.equal('/introduction');
  });
});