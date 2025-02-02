import { build, emptyDir } from 'jsr:@deno/dnt@0.41.3';

await emptyDir('./npm');

const version = JSON.parse(Deno.readTextFileSync('./deno.json')).version;

await build({
  entryPoints: ['./mod.ts'],
  outDir: './npm',
  shims: {
    deno: true,
  },
  typeCheck: false,
  package: {
    name: '@safelyx/api',
    version,
    description: 'API client for Safelyx.',
    license: 'ISC',
    author: 'Safelyx <help@safelyx.com>',
    keywords: [
      'safelyx',
      'api',
      'client',
      'sdk',
      'security',
      'automated moderation tools',
      'content moderation',
      'message moderation',
      'image moderation',
      'link safety check',
      'email verification',
      'ugc moderation',
      'user-generated content moderation',
      'content safety',
      'content safety tools',
      'content safety api',
      'content safety sdk',
      'content safety client',
    ],
    repository: {
      type: 'git',
      url: 'git+https://github.com/safelyx/safelyx-js.git',
    },
    bugs: {
      url: 'https://github.com/safelyx/safelyx-js/issues',
    },
    engines: {
      node: '>=18.0.0',
    },
  },
});

Deno.copyFileSync('README.md', 'npm/README.md');

const gitTag = new Deno.Command('git', { args: ['tag', version] });

await gitTag.spawn().status;
