import React, { Fragment, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby';
import classnames from 'classnames';
import { useIntl } from 'react-intl';

import { MDXRenderer } from 'gatsby-plugin-mdx';

import Layout from '../components/Layout';
import TableOfContents from '../components/TableOfContents';

import { useHighlight } from '../utils/hooks';

import css from '../styles/pages/page.module.css';
import grid from '../styles/grid.module.css';

const TutorialTemplate = ({ data, pageContext }) => {
  const { mdx } = data;
  //const { frontmatter, body, tableOfContents } = mdx;
  const ref = useHighlight();
  const intl = useIntl();

  return (
    <Layout>
      <div className={grid.grid} ref={ref}>
        {mdx !== null ? (
          <Fragment>
            <TableOfContents items={mdx.tableOfContents.items} />
            <h1
              className={classnames(
                grid.push2,
                grid.col5,
                grid.pull1,
                css.title
              )}>
              {mdx.frontmatter.title}
            </h1>
            <span
              className={classnames(
                grid.push2,
                grid.col5,
                grid.pull1,
                css.author
              )}>{`${intl.formatMessage({ id: 'by' })} ${
              mdx.frontmatter.author
            }`}</span>
            <div className={classnames(grid.col5, grid.push2, css.content)}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </Fragment>
        ) : (
          <div>
            {intl.formatMessage({ id: 'notTranslated' })}
            <Link to={pageContext.slug}>
              {' '}
              {intl.formatMessage({ id: 'englishPage' })}
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TutorialTemplate;

export const query = graphql`
  query($locale: String!, $slug: String!) {
    mdx(
      fields: { locale: { eq: $locale } }
      frontmatter: { slug: { eq: $slug } }
    ) {
      body
      frontmatter {
        title
        slug
        author
        level
      }
      tableOfContents
    }
  }
`;
