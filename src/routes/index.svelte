<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch('/podcasts.json')
    if (res.ok) {
      const podcasts = await res.json()
      return {
        props: podcasts,
      }
    }
  }
</script>

<script>
  import { podcastsStore } from '../stores/podcasts'

  // export let podcasts
</script>

<!-- <pre>{JSON.stringify($podcastsStore, null, 2)}</pre> -->

{#each $podcastsStore as { title, copyright, description, image }}
  <ul>
    <li class="py-10">
      <div class="card bordered">
        <figure>
          {#if image?.uri}
            <img src={image.uri} alt="" />
          {:else}
            <img
              src="https://api.lorem.space/image/fashion?w=500&h=500"
              alt={title}
            />
          {/if}
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {title}
            <div class="badge mx-2 badge-secondary">NEW</div>
          </h2>
          <small class="mb-5 -mt-2">{copyright}</small>
          <p>
            {@html description}
          </p>
          <div class="justify-end card-actions">
            <button class="btn btn-secondary">More info</button>
          </div>
        </div>
      </div>
    </li>
  </ul>
{/each}
