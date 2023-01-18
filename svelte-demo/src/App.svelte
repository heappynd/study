<script>
  let count = 0
  $: doubled = count * 2
  function handleClick() {
    count++
  }
  $: {
    console.log(`the count is ${count}`)
  }
  $: if (count >= 10) {
    alert(`count is dangerously high!`)
    count = 9
  }
</script>

<main>
  <h1>{count}</h1>
  <h2>{doubled}</h2>
  <button on:click={handleClick}>+</button>
</main>

<style>
</style>
