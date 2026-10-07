'use client'

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { $patchStyleText } from '@lexical/selection'
import { $getSelection, $isRangeSelection } from 'lexical'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function ColorToolbarButton() {
  const [editor] = useLexicalComposerContext()

  const applyColor = (color: string) => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection) && !selection.isCollapsed()) {
        $patchStyleText(selection, { color })
      }
    })
  }

  return (
    <button type="button" onClick={() => applyColor('#6d28d9')} aria-label="Apply text color">
      A
    </button>
  )
}

export const FontColorFeatureClient = createClientFeature({
  toolbarFixed: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          key: 'fontColor',
          label: 'Text color',
          Component: ColorToolbarButton,
        },
      ]),
    ],
  },
})
