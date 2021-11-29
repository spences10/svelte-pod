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
  import Modal from '$lib/components/modal.svelte'
  import { nowPlaying, setNowPlaying } from '../../stores/now-playing'

  export let podcast
  let { title, copyright, description, image, items } = podcast

  const clickPodcastLink = url => {
    setNowPlaying(url)
  }
  let isModalOpen = false
</script>

<!-- <pre>{JSON.stringify(podcast, null, 2)}</pre> -->

<div class="container max-w-5xl mx-auto px-4">
  <div class="flex mb-8">
    <div class="h-52 w-52">
      {#if image?.uri}
        <img class="object-cover" src={image.uri} alt={title} />
      {:else}
        <img
          class="object-cover"
          src="https://api.lorem.space/image/fashion?w=500&h=500"
          alt={`placeholder for ${title}`}
        />
      {/if}
    </div>
    <div class="prose pl-8">
      <h1>{title}</h1>
      <small>{copyright}</small>
      <p>{@html description}</p>
    </div>
  </div>

  {#each items as { title, link, pubDate, description, content, enclosure: { url, length } }}
    <div class="prose">
      <h2>{title}</h2>
      <p>{new Date(pubDate)}</p>
      <button on:click={() => (isModalOpen = !isModalOpen)}
        >Open</button
      >
      <Modal bind:isModalOpen>
        {#if content}
          <p>{@html content}</p>
        {:else}
          <p>{description}</p>
        {/if}
        <button
          class="btn"
          on:click={() => {
            clickPodcastLink(url)
          }}>Play</button
        >
        <p>
          {$nowPlaying}
        </p>
      </Modal>
    </div>
  {/each}
</div>
