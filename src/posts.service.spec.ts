import { Post, PostsService } from './posts.service';

describe("PostsService", () => {
  let postsService: PostsService;
  const post: Omit<Post, "id" | "date"> = {
    text: "Mocked post",
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: "Some pre-existing post" });
  });

  it("should add a new post", () => {
    const created = postsService.create(post);
    expect(created).toHaveProperty("id");
    expect(created).toHaveProperty("date");
    expect(created.text).toBe(post.text);
    // Проверяем, что пост можно найти по id
    const found = postsService.find(created.id);
    expect(found).toBeDefined();
    expect(found?.text).toBe(post.text);
  });

  it("should find a post", () => {
    const created = postsService.create(post);
    const found = postsService.find(created.id);
    expect(found).toBeDefined();
    expect(found?.id).toBe(created.id);
    expect(found?.text).toBe(post.text);
  });
});
