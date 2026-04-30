import { expect } from 'chai';
import route from './routes';

describe('routes', () => {
  it('exports a single route object (not an array)', () => {
    expect(route).to.be.an('object');
    expect(route).to.not.be.an('array');
  });

  it('has path set to /', () => {
    expect(route.path).to.equal('/');
  });

  it('has a component defined', () => {
    expect(route.component).to.exist;
  });

  it('has an indexRoute that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');

    const replaceCalls = [];
    route.indexRoute.onEnter({}, path => replaceCalls.push(path));
    expect(replaceCalls).to.deep.equal(['/introduction']);
  });

  it('has childRoutes defined as an array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});