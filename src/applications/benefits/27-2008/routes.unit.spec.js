import { expect } from 'chai';
import route from './routes';

describe('routes', () => {
  it('exports a route object (not an array)', () => {
    expect(route).to.be.an('object');
    expect(Array.isArray(route)).to.be.false;
  });

  it('has path "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('has an indexRoute with onEnter function', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
  });

  it('indexRoute.onEnter redirects to /introduction', () => {
    let replaced = null;
    const replace = path => {
      replaced = path;
    };
    route.indexRoute.onEnter({}, replace);
    expect(replaced).to.equal('/introduction');
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});