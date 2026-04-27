import { expect } from 'chai';

import route from './routes';
import App from './containers/App';
import formConfig from './config/form';

describe('routes', () => {
  it('should be a nested route object, not a flat array', () => {
    expect(route).to.be.an('object');
    expect(Array.isArray(route)).to.be.false;
  });

  it('should have path set to "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('should use App as the component', () => {
    expect(route.component).to.equal(App);
  });

  it('should have an indexRoute that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');

    let replacedPath = null;
    route.indexRoute.onEnter({}, path => {
      replacedPath = path;
    });
    expect(replacedPath).to.equal('/introduction');
  });

  it('should have childRoutes array from createRoutesWithSaveInProgress', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});