<script context="module">
  export const load = async ({ fetch, page: { params } }) => {
    const { slug } = params
    const res = await fetch(`/podcasts/${slug}.json`)
    if (res.ok) {
      const podcast = await res.json()
      return {
        props: { podcast },
      }
    }
  }
</script>

<script>
  export let podcast
</script>

<pre>{JSON.stringify(podcast, null, 2)}</pre>

<h2>Wheeeee</h2>
