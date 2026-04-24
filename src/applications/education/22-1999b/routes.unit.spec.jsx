import { expect } from 'chai';

import route from './routes';
import App from './containers/App';

describe('routes', () => {
  it('exports a single route object', () => {
    expect(route).to.be.an('object');
  });

  it('has path "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('has App as the component', () => {
    expect(route.component).to.equal(App);
  });

  it('has an indexRoute that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
    const replace = path => {
      replace.calledWith = path;
    };
    route.indexRoute.onEnter({}, replace);
    expect(replace.calledWith).to.equal('/introduction');
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});