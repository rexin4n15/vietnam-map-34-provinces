# Contributing

## Commit Convention

Dự án này sử dụng [Conventional Commits](https://www.conventionalcommits.org/) để tự động tạo version và release notes.

### Format

```
<type>(<scope>): <subject>
```

### Types

- **feat**: Tính năng mới (tăng MINOR version)
- **fix**: Sửa bug (tăng PATCH version)
- **docs**: Cập nhật documentation
- **style**: Thay đổi format code (không ảnh hưởng logic)
- **refactor**: Refactor code
- **perf**: Cải thiện performance
- **test**: Thêm/sửa tests
- **chore**: Cập nhật build scripts, dependencies, etc.
- **ci**: Thay đổi CI/CD configuration

### Breaking Changes

Để tạo MAJOR version, thêm `BREAKING CHANGE:` vào commit body hoặc thêm `!` sau type:

```
feat!: thay đổi API structure

BREAKING CHANGE: API đã được thiết kế lại hoàn toàn
```

### Ví dụ

```bash
# Tính năng mới (1.0.0 -> 1.1.0)
feat: thêm support cho Vue component

# Sửa bug (1.0.0 -> 1.0.1)
fix: sửa lỗi hiển thị tooltip

# Breaking change (1.0.0 -> 2.0.0)
feat!: thay đổi cách import module

# Với scope
feat(react): thêm prop mới cho VietnamMap component
fix(core): sửa lỗi tính toán tọa độ
```

## Release Process

### Tự động (Khuyến nghị)

Khi push code lên branch `main`, GitHub Actions sẽ tự động:

1. Phân tích commit messages
2. Tăng version theo semantic versioning
3. Tạo CHANGELOG.md
4. Build package
5. Publish lên npm
6. Tạo GitHub Release

### Setup

Để sử dụng auto release, cần setup NPM_TOKEN trong GitHub Secrets:

1. Tạo npm access token tại https://www.npmjs.com/settings/[username]/tokens
2. Thêm token vào GitHub repo: Settings > Secrets and variables > Actions > New repository secret
3. Tên secret: `NPM_TOKEN`
4. Value: npm token vừa tạo

### Workflow

```bash
# 1. Tạo branch mới
git checkout -b feature/new-feature

# 2. Phát triển và commit với conventional format
git commit -m "feat: thêm tính năng mới"

# 3. Push và tạo Pull Request
git push origin feature/new-feature

# 4. Merge PR vào main -> Tự động release!
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Development mode
npm run dev

# Lint
npm run lint
```
