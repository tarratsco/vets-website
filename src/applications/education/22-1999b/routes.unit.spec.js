import { expect } from 'chai';
import route from './routes';
import App from './containers/App';

describe('routes', () => {
  it('is a single route object, not an array', () => {
    expect(route).to.be.an('object');
    expect(Array.isArray(route)).to.be.false;
  });

  it('has path "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('has component set to App', () => {
    expect(route.component).to.equal(App);
  });

  it('has an indexRoute with onEnter function', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
  });

  it('indexRoute onEnter calls replace with /introduction', () => {
    let replaced = null;
    const mockReplace = path => {
      replaced = path;
    };
    route.indexRoute.onEnter({}, mockReplace);
    expect(replaced).to.equal('/introduction');
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});