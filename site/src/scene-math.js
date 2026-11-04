export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export function sampleFrames(frames, position) {
  if (!frames.length) return null;
  if (position <= frames[0].at) return { ...frames[0] };
  for (let i = 1; i < frames.length; i++) {
    if (position <= frames[i].at) {
      const a = frames[i - 1], b = frames[i];
      const raw = clamp((position - a.at) / Math.max(1, b.at - a.at));
      const t = raw * raw * (3 - 2 * raw);
      return Object.fromEntries(Object.keys(a).map(key => [key, typeof a[key] === 'number' ? a[key] + (b[key] - a[key]) * t : (t < .5 ? a[key] : b[key])]));
    }
  }
  return { ...frames.at(-1) };
}
