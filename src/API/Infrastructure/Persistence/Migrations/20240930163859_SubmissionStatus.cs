using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OnlineJudge.API.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SubmissionStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StatusRepresentation_ActualOutput",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusRepresentation_Discriminator",
                table: "Submissions",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StatusRepresentation_Error",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusRepresentation_Input",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "StatusRepresentation_Key",
                table: "Submissions",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StatusRepresentation_Output",
                table: "Submissions",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Submissions_LanguageId",
                table: "Submissions",
                column: "LanguageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Submissions_Languages_LanguageId",
                table: "Submissions",
                column: "LanguageId",
                principalTable: "Languages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Submissions_Languages_LanguageId",
                table: "Submissions");

            migrationBuilder.DropIndex(
                name: "IX_Submissions_LanguageId",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "StatusRepresentation_ActualOutput",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "StatusRepresentation_Discriminator",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "StatusRepresentation_Error",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "StatusRepresentation_Input",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "StatusRepresentation_Key",
                table: "Submissions");

            migrationBuilder.DropColumn(
                name: "StatusRepresentation_Output",
                table: "Submissions");
        }
    }
}
