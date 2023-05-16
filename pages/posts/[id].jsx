import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { useRouter } from 'next/router'

export default function Post({ postData }) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <Layout>
        <div>Loading ...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

export function getStaticPaths() {
  const allPostIds = getAllPostIds()

  const paths = allPostIds.map(postId => ({
    params: { id: postId },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
