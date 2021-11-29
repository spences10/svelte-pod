<script>
  import slugify from 'slugify'
  import { podcastsStore } from '../stores/podcasts'
</script>

<!-- <pre>{JSON.stringify($podcastsStore, null, 2)}</pre> -->

<div class="container max-w-xl mx-auto px-4">
  {#each $podcastsStore as { title, copyright, description, image }}
    <ul>
      <li class="py-10">
        <div class="card bordered">
          <figure>
            {#if image?.uri}
              <img src={image.uri} alt={title} />
            {:else}
              <img
                src="https://api.lorem.space/image/fashion?w=500&h=500"
                alt={`placeholder for ${title}`}
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
              <a
                class="btn btn-secondary"
                sveltekit:prefetch
                href={`/podcasts/${slugify(title, { lower: true })}`}
                >More info</a
              >
            </div>
          </div>
        </div>
      </li>
    </ul>
  {/each}
</div>
