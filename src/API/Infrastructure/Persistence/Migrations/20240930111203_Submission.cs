using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineJudge.API.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Submission : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LanguageId",
                table: "Submissions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SourceCode",
                table: "Submissions",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LanguageId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "SourceCode",
                table: "Submissions");
        }
    }
}
