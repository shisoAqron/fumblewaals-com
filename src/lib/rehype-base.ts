// Markdown(生HTML含む)内の "/..." で始まる href / src に base を付ける。
interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

export function rehypeBase({ base }: { base: string }) {
  const prefix = base.replace(/\/$/, '');
  return (tree: HastNode) => {
    if (!prefix) return;
    const walk = (node: HastNode) => {
      for (const key of ['href', 'src']) {
        const v = node.properties?.[key];
        if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//')) {
          node.properties![key] = prefix + v;
        }
      }
      node.children?.forEach(walk);
    };
    walk(tree);
  };
}
