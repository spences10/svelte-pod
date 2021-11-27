<script context="module">
  export const prerender = true

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
  let { title, copyright, description, image, items } = podcast
</script>

<!-- <pre>{JSON.stringify(podcast, null, 2)}</pre> -->

<h2>{title}</h2>
<small>{copyright}</small>
<p>{@html description}</p>
{#if image?.uri}
  <img src={image.uri} alt={title} />
{/if}
{#each items as { title, link, enclosure: { url } }}
  <a href={link}>{title}</a>
  <p>{title}</p>
{/each}
