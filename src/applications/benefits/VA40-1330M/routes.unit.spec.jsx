import { expect } from 'chai';
import route from './routes';

describe('routes', () => {
  it('exports a route object', () => {
    expect(route).to.be.an('object');
  });

  it('has path "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('has a component property', () => {
    expect(route.component).to.exist;
  });

  it('has an indexRoute with onEnter that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
    const replaceCalls = [];
    route.indexRoute.onEnter({}, path => replaceCalls.push(path));
    expect(replaceCalls).to.deep.equal(['/introduction']);
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});