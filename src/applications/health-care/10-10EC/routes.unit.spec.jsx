import { expect } from 'chai';
import route from './routes';
import App from './containers/App';

describe('10-10EC routes', () => {
  it('should export a route object', () => {
    expect(route).to.be.an('object');
  });

  it('should have path "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('should have App as the component', () => {
    expect(route.component).to.equal(App);
  });

  it('should have an indexRoute that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
    let replaced = null;
    route.indexRoute.onEnter({}, path => {
      replaced = path;
    });
    expect(replaced).to.equal('/introduction');
  });

  it('should have childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});