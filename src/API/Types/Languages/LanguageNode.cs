using OnlineJudge.API.Domain.Entities;

namespace OnlineJudge.API.Types.Languages;

[ObjectType<Language>]
public static partial class LanguageNode
{
    static partial void Configure(IObjectTypeDescriptor<Language> descriptor)
    {
        descriptor.BindFieldsExplicitly();

        descriptor.Field(l => l.Id);
        descriptor.Field(l => l.Name);
    }
}