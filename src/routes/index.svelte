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
  import slugify from 'slugify'

  export let podcasts
</script>

{#each podcasts as { title }}
  <ul>
    <li>
      <a href={`podcasts/${slugify(title, { lower: true })}`}
        >{title}</a
      >
    </li>
  </ul>
{/each}
