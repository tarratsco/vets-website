import { expect } from 'chai';
import route from './routes';
import App from './containers/App';

describe('routes', () => {
  it('exports a route object (not an array)', () => {
    expect(route).to.be.an('object');
    expect(route).not.to.be.an('array');
  });

  it('has path set to "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('has component set to App', () => {
    expect(route.component).to.equal(App);
  });

  it('has an indexRoute with onEnter handler', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
  });

  it('indexRoute onEnter redirects to /introduction', () => {
    const replace = val => {
      replace.lastArg = val;
    };
    route.indexRoute.onEnter({}, replace);
    expect(replace.lastArg).to.equal('/introduction');
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});