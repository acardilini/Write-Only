import { Tldraw, createShapeId, toRichText } from 'tldraw'
import { getAssetUrlsByImport } from '@tldraw/assets/imports'
import 'tldraw/tldraw.css'
import { createRoot } from 'react-dom/client'
window.createShapeId = createShapeId
window.toRichText = toRichText
const assetUrls = getAssetUrlsByImport()
createRoot(document.getElementById('root')).render(
  <div style={{ position: 'fixed', inset: 0 }}>
    <Tldraw hideUi assetUrls={assetUrls} onMount={(e) => { window.editor = e }} />
  </div>
)
