# sure-ui

It borrowed from [`Element Plus`](https://github.com/element-plus/element-plus)

## Install

```bash
npm i sure-ui
```

## Usage

Add `sure-ui` in your main entry file.

```ts
// main.ts
import { createApp } from 'vue'
import SureUI from 'sure-ui'
import 'sure-ui/dist/index.css'

createApp(App).use(SureUI).mount('#app')
```

But now, Just implemented the `Icon` component, it can be combined with icon components implemented in `sure-icons-vue`

```bash
npm i sure-icons-vue
```

use it in your custom component file

```vue
<script setup lang="ts">
import { Wechat } from 'sure-icons-vue'
</script>

<template>
  <div class="container">
    <sure-icon color="#f40" :size="30">
      <Wechat />
    </sure-icon>
  </div>
</template>
```

## License

[MIT](./LICENSE) License © 2022 [K. ( `suressk` )](https://github.com/suressk)