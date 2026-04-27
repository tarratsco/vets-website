import { expect } from 'chai';
import route from './routes';

describe('VA40-1330M routes', () => {
  it('exports a single route object', () => {
    expect(route).to.be.an('object');
  });

  it('has path "/"', () => {
    expect(route.path).to.equal('/');
  });

  it('has a component property', () => {
    expect(route.component).to.be.a('function');
  });

  it('has an indexRoute that redirects to /introduction', () => {
    expect(route.indexRoute).to.be.an('object');
    expect(route.indexRoute.onEnter).to.be.a('function');
    const replace = path => {
      replace.lastPath = path;
    };
    route.indexRoute.onEnter({}, replace);
    expect(replace.lastPath).to.equal('/introduction');
  });

  it('has childRoutes array', () => {
    expect(route.childRoutes).to.be.an('array');
    expect(route.childRoutes.length).to.be.greaterThan(0);
  });
});