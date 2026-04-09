import { useSyncExternalStore } from 'react'

const createSvgDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const createGameCardSvg = ({
  background,
  ringOuter,
  ringInner,
  emoji,
  title,
  accent
}) => createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" rx="36" fill="${background}" />
    <circle cx="200" cy="200" r="150" fill="${ringOuter}" />
    <circle cx="200" cy="200" r="104" fill="${ringInner}" />
    <text x="200" y="160" text-anchor="middle" font-family="Arial, sans-serif" font-size="54">${emoji}</text>
    <text x="200" y="224" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="28" font-weight="700">${title}</text>
    <rect x="110" y="260" width="180" height="12" rx="6" fill="${accent}" opacity="0.85" />
  </svg>
`)

const createPracticeSceneSvg = ({
  background,
  surface,
  accent,
  icon,
  title,
  subtitle
}) => createSvgDataUri(`
  <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${background}" />
        <stop offset="100%" stop-color="${surface}" />
      </linearGradient>
    </defs>
    <rect width="1280" height="720" fill="url(#bg)" />
    <circle cx="1080" cy="120" r="180" fill="${accent}" opacity="0.18" />
    <circle cx="180" cy="600" r="160" fill="${accent}" opacity="0.16" />
    <rect x="118" y="110" width="1044" height="500" rx="40" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.32)" />
    <rect x="170" y="180" width="940" height="360" rx="28" fill="rgba(255,255,255,0.14)" />
    <text x="640" y="290" text-anchor="middle" font-family="Arial, sans-serif" font-size="120">${icon}</text>
    <text x="640" y="390" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="44" font-weight="700">${title}</text>
    <text x="640" y="450" text-anchor="middle" fill="white" opacity="0.92" font-family="Arial, sans-serif" font-size="26">${subtitle}</text>
  </svg>
`)

const RETRY_DELAY_MS = 2500
const MIN_PENDING_IMAGE_BYTES = 4096
const pendingHintPattern = /pending|loading|placeholder|process|queue|wait/i

const encodePrompt = (prompt) => encodeURIComponent(prompt)
const buildGeneratedImageUrl = (prompt, imageSize) =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodePrompt(prompt)}&image_size=${imageSize}`

const appendCacheBust = (url) => {
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}t=${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const gameFallbacks = {
  'eighty-points': createGameCardSvg({
    background: '#1f2f3f',
    ringOuter: '#1d4b6a',
    ringInner: '#2f7aa2',
    emoji: '♠♥',
    title: '八十分',
    accent: '#f4c95d'
  }),
  'sichuan-mahjong': createGameCardSvg({
    background: '#5c1f1f',
    ringOuter: '#8c3a27',
    ringInner: '#d08a38',
    emoji: '🀄',
    title: '川麻',
    accent: '#ffe08a'
  }),
  doudizhu: createGameCardSvg({
    background: '#2c2148',
    ringOuter: '#7e2f5f',
    ringInner: '#c44569',
    emoji: '🃏',
    title: '斗地主',
    accent: '#ffd166'
  })
}

const practiceFallbacks = {
  eightyPoints: createPracticeSceneSvg({
    background: '#0b3d2e',
    surface: '#175a46',
    accent: '#f4c95d',
    icon: '♣♦',
    title: '八十分实践场景',
    subtitle: '静态替代图，用于替换仍在生成中的远程插图'
  }),
  sichuanMahjong: createPracticeSceneSvg({
    background: '#702632',
    surface: '#b04734',
    accent: '#ffd27d',
    icon: '🀄',
    title: '川麻实践场景',
    subtitle: '静态替代图，用于替换仍在生成中的远程插图'
  }),
  doudizhu: createPracticeSceneSvg({
    background: '#2f2a68',
    surface: '#7b3fa1',
    accent: '#ffd166',
    icon: '🃏',
    title: '斗地主实践场景',
    subtitle: '静态替代图，用于替换仍在生成中的远程插图'
  })
}

const createRemoteImageAsset = ({ id, prompt, imageSize, fallback }) => ({
  id,
  prompt,
  imageSize,
  fallback,
  remoteUrl: buildGeneratedImageUrl(prompt, imageSize)
})

export const gameImages = {
  'eighty-points': createRemoteImageAsset({
    id: 'game-eighty-points',
    prompt: 'Chinese card game Eighty Points with playing cards on table, vibrant colors, clean design',
    imageSize: 'square',
    fallback: gameFallbacks['eighty-points']
  }),
  'sichuan-mahjong': createRemoteImageAsset({
    id: 'game-sichuan-mahjong',
    prompt: 'Sichuan mahjong game with tiles on table, traditional Chinese style, vibrant colors',
    imageSize: 'square',
    fallback: gameFallbacks['sichuan-mahjong']
  }),
  doudizhu: createRemoteImageAsset({
    id: 'game-doudizhu',
    prompt: 'Chinese card game Landlord with playing cards, competitive atmosphere, modern design',
    imageSize: 'square',
    fallback: gameFallbacks.doudizhu
  })
}

export const practiceImages = {
  eightyPointsGoal: createRemoteImageAsset({
    id: 'practice-eighty-points-goal',
    prompt: 'Chinese card game Eighty Points team play with players cooperating, vibrant colors, clean design',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsDeck: createRemoteImageAsset({
    id: 'practice-eighty-points-deck',
    prompt: 'Two decks of playing cards for Eighty Points game, 108 cards including jokers, neatly arranged',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsRanking: createRemoteImageAsset({
    id: 'practice-eighty-points-ranking',
    prompt: 'Playing cards ranking order for Eighty Points game, with jokers on top, visual hierarchy',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsDeal: createRemoteImageAsset({
    id: 'practice-eighty-points-deal',
    prompt: 'Dealing cards in Eighty Points game, 4 players receiving 12 cards each, 8 cards as bottom cards',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsBid: createRemoteImageAsset({
    id: 'practice-eighty-points-bid',
    prompt: 'Players bidding in Eighty Points game, selecting trump suit and rank, competitive atmosphere',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsPlay: createRemoteImageAsset({
    id: 'practice-eighty-points-play',
    prompt: 'Players playing Eighty Points game, following suit rules, clockwise play order',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsScore: createRemoteImageAsset({
    id: 'practice-eighty-points-score',
    prompt: 'Scoring points in Eighty Points game, showing point cards JQK10 and 5, visual representation',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsStrategy: createRemoteImageAsset({
    id: 'practice-eighty-points-strategy',
    prompt: 'Player considering whether to bid in Eighty Points game, analyzing hand strength, thoughtful expression',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  eightyPointsTeamwork: createRemoteImageAsset({
    id: 'practice-eighty-points-teamwork',
    prompt: 'Team cooperation in Eighty Points game, players communicating through card play, strategic partnership',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.eightyPoints
  }),
  sichuanMahjongGoal: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-goal',
    prompt: 'Sichuan mahjong game with players competing, traditional Chinese style, vibrant colors',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongTiles: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-tiles',
    prompt: 'Mahjong tiles for Sichuan mahjong, 108 tiles including dots, bamboos, characters, neatly arranged',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongDeal: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-deal',
    prompt: 'Mahjong players drawing tiles, dealer getting 14 tiles, others 13 tiles, traditional setup',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongDice: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-dice',
    prompt: 'Mahjong players rolling dice to determine starting position, traditional ritual',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongMeld: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-meld',
    prompt: 'Mahjong player declaring chi, peng, or gang, traditional gestures',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongWin: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-win',
    prompt: 'Mahjong winning hand with four sets and a pair, traditional Chinese style',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongScoring: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-scoring',
    prompt: 'Mahjong scoring system with fan counting, traditional Chinese style',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  sichuanMahjongPatterns: createRemoteImageAsset({
    id: 'practice-sichuan-mahjong-patterns',
    prompt: 'Mahjong special patterns with different fan values, colorful tiles',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.sichuanMahjong
  }),
  doudizhuGoal: createRemoteImageAsset({
    id: 'practice-doudizhu-goal',
    prompt: 'Chinese card game Landlord with players competing, modern design, vibrant colors',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuRanking: createRemoteImageAsset({
    id: 'practice-doudizhu-ranking',
    prompt: 'Playing cards ranking order for Landlord game, with jokers and 2s on top, visual hierarchy',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuDeal: createRemoteImageAsset({
    id: 'practice-doudizhu-deal',
    prompt: 'Dealing cards in Landlord game, 3 players receiving 17 cards each, 3 cards as bottom cards',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuBid: createRemoteImageAsset({
    id: 'practice-doudizhu-bid',
    prompt: 'Players bidding in Landlord game, selecting points 1-3, competitive atmosphere',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuPlay: createRemoteImageAsset({
    id: 'practice-doudizhu-play',
    prompt: 'Players playing Landlord game, following card type rules, clockwise play order',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuVictory: createRemoteImageAsset({
    id: 'practice-doudizhu-victory',
    prompt: 'Landlord game winner celebrating, player with empty hand, victorious moment',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuStrategy: createRemoteImageAsset({
    id: 'practice-doudizhu-strategy',
    prompt: 'Player considering whether to bid in Landlord game, analyzing hand strength, thoughtful expression',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  }),
  doudizhuTeamwork: createRemoteImageAsset({
    id: 'practice-doudizhu-teamwork',
    prompt: 'Two peasants cooperating in Landlord game, strategic partnership, teamwork',
    imageSize: 'landscape_16_9',
    fallback: practiceFallbacks.doudizhu
  })
}

const allImageAssets = [...Object.values(gameImages), ...Object.values(practiceImages)]

const imageStates = new Map(
  allImageAssets.map((asset) => [
    asset.id,
    {
      status: 'pending',
      resolvedSrc: asset.fallback,
      attemptCount: 0,
      objectUrl: null,
      signature: null
    }
  ])
)

const listeners = new Set()
const knownPendingSignatures = new Set()
let monitorPromise = null
let allImagesResolved = false

const emitChange = () => {
  listeners.forEach((listener) => listener())
}

const subscribe = (listener) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const getStateSnapshot = (image) => {
  if (!image || typeof image === 'string') {
    return image ?? ''
  }

  return imageStates.get(image.id)?.resolvedSrc ?? image.fallback
}

export const useGeneratedImageSource = (image) =>
  useSyncExternalStore(subscribe, () => getStateSnapshot(image), () => getStateSnapshot(image))

const canMonitorImages = () =>
  typeof window !== 'undefined' &&
  typeof fetch === 'function' &&
  typeof Blob !== 'undefined'

const delay = (ms) => new Promise((resolve) => {
  window.setTimeout(resolve, ms)
})

const cleanupObjectUrl = (state) => {
  if (state?.objectUrl && typeof URL !== 'undefined' && typeof URL.revokeObjectURL === 'function') {
    URL.revokeObjectURL(state.objectUrl)
  }
}

const updateState = (image, nextState) => {
  const currentState = imageStates.get(image.id)

  if (currentState?.objectUrl && currentState.objectUrl !== nextState.objectUrl) {
    cleanupObjectUrl(currentState)
  }

  imageStates.set(image.id, nextState)
  emitChange()
}

const decodeBuffer = (buffer) => {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder().decode(buffer)
  }

  return Array.from(new Uint8Array(buffer))
    .map((value) => String.fromCharCode(value))
    .join('')
}

const computeBlobSignature = async (blob) => {
  const buffer = await blob.arrayBuffer()

  if (globalThis.crypto?.subtle) {
    const digest = await globalThis.crypto.subtle.digest('SHA-256', buffer)
    return Array.from(new Uint8Array(digest))
      .map((value) => value.toString(16).padStart(2, '0'))
      .join('')
  }

  return `${blob.type}:${blob.size}:${decodeBuffer(buffer).slice(0, 128)}`
}

const shouldTreatAsPending = ({ blob, signature, responseUrl, duplicateSignatures }) => {
  if (pendingHintPattern.test(responseUrl)) {
    return true
  }

  if (blob.size <= MIN_PENDING_IMAGE_BYTES) {
    return true
  }

  if (knownPendingSignatures.has(signature)) {
    return true
  }

  if (duplicateSignatures.has(signature)) {
    knownPendingSignatures.add(signature)
    return true
  }

  return false
}

const fetchRemoteImage = async (image) => {
  const response = await fetch(appendCacheBust(image.remoteUrl), {
    cache: 'no-store',
    mode: 'cors'
  })

  if (!response.ok) {
    throw new Error(`Image fetch failed with status ${response.status}`)
  }

  const blob = await response.blob()
  const signature = await computeBlobSignature(blob)

  return {
    blob,
    signature,
    responseUrl: response.url || image.remoteUrl
  }
}

const markAsPending = (image, currentState) => {
  updateState(image, {
    ...currentState,
    status: 'pending',
    resolvedSrc: image.fallback,
    attemptCount: currentState.attemptCount + 1,
    objectUrl: null
  })
}

const markAsCompleted = (image, currentState, blob, signature) => {
  const objectUrl =
    typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function'
      ? URL.createObjectURL(blob)
      : image.remoteUrl

  updateState(image, {
    ...currentState,
    status: 'completed',
    resolvedSrc: objectUrl,
    attemptCount: currentState.attemptCount + 1,
    objectUrl,
    signature
  })
}

const runMonitorRound = async (pendingImages) => {
  const results = await Promise.all(
    pendingImages.map(async (image) => {
      const currentState = imageStates.get(image.id)

      try {
        return {
          image,
          currentState,
          ok: true,
          ...(await fetchRemoteImage(image))
        }
      } catch (error) {
        return {
          image,
          currentState,
          ok: false,
          error
        }
      }
    })
  )

  const signatureCounts = new Map()

  results
    .filter((result) => result.ok)
    .forEach((result) => {
      signatureCounts.set(result.signature, (signatureCounts.get(result.signature) ?? 0) + 1)
    })

  const duplicateSignatures = new Set(
    [...signatureCounts.entries()]
      .filter(([, count]) => count > 1)
      .map(([signature]) => signature)
  )

  results.forEach((result) => {
    if (!result.ok) {
      markAsPending(result.image, result.currentState)
      return
    }

    if (
      shouldTreatAsPending({
        blob: result.blob,
        signature: result.signature,
        responseUrl: result.responseUrl,
        duplicateSignatures
      })
    ) {
      markAsPending(result.image, result.currentState)
      return
    }

    markAsCompleted(result.image, result.currentState, result.blob, result.signature)
  })
}

export const startImageGenerationMonitor = () => {
  if (!canMonitorImages() || allImagesResolved) {
    return Promise.resolve()
  }

  if (!monitorPromise) {
    monitorPromise = (async () => {
      while (true) {
        const pendingImages = allImageAssets.filter((image) => imageStates.get(image.id)?.status !== 'completed')

        if (pendingImages.length === 0) {
          allImagesResolved = true
          return
        }

        await runMonitorRound(pendingImages)

        const hasPendingImages = pendingImages.some((image) => imageStates.get(image.id)?.status !== 'completed')

        if (!hasPendingImages) {
          allImagesResolved = true
          return
        }

        await delay(RETRY_DELAY_MS)
      }
    })().finally(() => {
      monitorPromise = null
    })
  }

  return monitorPromise
}

export default { gameImages, practiceImages, startImageGenerationMonitor, useGeneratedImageSource }
