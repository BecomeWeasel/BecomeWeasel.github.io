import React from 'react';

import Layout from '../layout';
import Seo from '../components/seo';
import Logo from '../../static/404.jpg';

function NotFoundPage() {
  return (
    <Layout>
      <Seo title="404: Not found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <img width={540} height={675} src={Logo} alt={'404logo'} />
    </Layout>
  );
}

export default NotFoundPage;
